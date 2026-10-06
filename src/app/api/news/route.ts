import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!process.env.NEXT_PUBLIC_NEWS_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const res = await axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=10`);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("NewsAPI Error:", error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: error.response?.status || 500 });
  }
}
