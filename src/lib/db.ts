import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

export { sql };

// Dashboard stats
export async function getDashboardStats() {
  if (!sql) {
    return {
      totalTransactions: 0,
      processing: 0,
      completed: 0,
      revenue: 0,
      pendingSlips: 0,
      failed: 0,
      customers: 5,
    };
  }
  
  const totalTransactions = await sql`SELECT COUNT(*) FROM transactions`;
  const processing = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'processing'`;
  const completed = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'completed'`;
  const revenue = await sql`SELECT COALESCE(SUM(fee_myr), 0) FROM transactions WHERE status = 'completed'`;
  const pendingSlips = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'awaiting_slip'`;
  const failed = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'failed'`;
  const customers = await sql`SELECT COUNT(*) FROM customers`;

  return {
    totalTransactions: parseInt(totalTransactions[0].count),
    processing: parseInt(processing[0].count),
    completed: parseInt(completed[0].count),
    revenue: parseFloat(revenue[0].coalesce),
    pendingSlips: parseInt(pendingSlips[0].count),
    failed: parseInt(failed[0].count),
    customers: parseInt(customers[0].count),
  };
}

// Recent transactions
export async function getRecentTransactions(limit = 10) {
  if (!sql) return [];
  
  return await sql`
    SELECT * FROM transactions 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `;
}

// All customers
export async function getCustomers() {
  if (!sql) return [];
  
  return await sql`SELECT * FROM customers ORDER BY created_at DESC`;
}

// Loyalty stats
export async function getLoyaltyStats() {
  if (!sql) {
    return {
      totalMembers: 5,
      byTier: [],
    };
  }
  
  const totalMembers = await sql`SELECT COUNT(*) FROM loyalty`;
  const byTier = await sql`
    SELECT tier, COUNT(*) as count 
    FROM loyalty 
    GROUP BY tier
  `;
  
  return {
    totalMembers: parseInt(totalMembers[0].count),
    byTier,
  };
}

// Pipeline stats for dashboard
export async function getPipelineStats() {
  if (!sql) {
    return {
      contacted: 5,
      responded: 0,
      inTransaction: 0,
      completed: 0,
      failed: 0,
    };
  }
  
  const contacted = await sql`SELECT COUNT(*) FROM customers WHERE outreach_status != 'not_sent'`;
  const responded = await sql`SELECT COUNT(*) FROM customers WHERE outreach_status IN ('responded', 'in_transaction', 'completed')`;
  const inTransaction = await sql`SELECT COUNT(*) FROM transactions WHERE status IN ('awaiting_slip', 'slip_received', 'processing')`;
  const completed = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'completed'`;
  const failed = await sql`SELECT COUNT(*) FROM transactions WHERE status = 'failed'`;

  return {
    contacted: parseInt(contacted[0].count),
    responded: parseInt(responded[0].count),
    inTransaction: parseInt(inTransaction[0].count),
    completed: parseInt(completed[0].count),
    failed: parseInt(failed[0].count),
  };
}
