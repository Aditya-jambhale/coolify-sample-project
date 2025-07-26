// pages/api/create-table.js (for Pages Router)
// OR app/api/create-table/route.js (for App Router)

import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your internal connection string
  ssl: false // Set to true if your local setup requires SSL
});


export async function POST(request) {
  const client = await pool.connect();
  
  try {
    const body = await request.json();
    
    // Create table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    await client.query(createTableQuery);

    // Insert a row
    const insertQuery = `
      INSERT INTO users (name, email) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    
    const { name, email } = body;
    const result = await client.query(insertQuery, [
      name || 'John Doe', 
      email || 'john.doe@example.com'
    ]);

    return Response.json({
      success: true,
      message: 'Table created and row inserted successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Database error:', error);
    return Response.json({
      success: false,
      error: 'Database operation failed',
      details: error.message
    }, { status: 500 });
  } finally {
    client.release();
  }
}
