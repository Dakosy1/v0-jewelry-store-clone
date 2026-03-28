import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function getDb() {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

async function saveDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const newProduct = await request.json();
    
    // Simple validation
    if (!newProduct.nameRu || !newProduct.price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate ID if missing
    if (!newProduct.id) {
      newProduct.id = `idx_${Date.now()}`;
    }

    db.products.push(newProduct);
    await saveDb(db);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
