# FabricXAI Vector Database Integration Guide

## Overview

The FabricXAI ERP platform now includes a comprehensive vector database system powered by Supabase, enabling semantic search and AI-powered context retrieval across all 13 modules.

## Architecture

### Components

1. **Backend (Supabase Edge Functions)**
   - `/supabase/functions/server/index.tsx` - Main server with vector endpoints
   - Embedding generation
   - Vector storage and retrieval
   - Cosine similarity search

2. **Frontend Utilities**
   - `/utils/supabase/vector_store.tsx` - Core vector operations
   - `/utils/supabase/useVectorStore.tsx` - React hook for vector DB
   - `/utils/supabase/seedVectorData.tsx` - Sample data seeding

3. **UI Components**
   - `/components/VectorDatabaseAdmin.tsx` - Admin panel for management
   - `/components/AIAssistantPanel.tsx` - Enhanced with vector search

## Key Features

### 1. Semantic Search
- Find contextually relevant data across all modules
- Threshold-based filtering (default: 0.7 similarity)
- Module-specific or global search capabilities

### 2. AI Context Enhancement
- Automatic context retrieval for AI Assistant
- Top 3 most relevant documents provided to MARBIM
- Similarity scoring displayed to users

### 3. Document Embeddings
- 384-dimensional vector embeddings
- Automatic generation for text content
- Normalized vectors for accurate similarity

### 4. Module Integration
All 13 modules are vector-enabled:
- Lead Management
- Buyer Management
- Supplier Evaluation
- RFQ & Quotation
- Costing
- Production Planning
- Quality Control
- Shipment
- Finance
- Sustainability
- Compliance Policy
- Workforce Management
- Analytics

## API Endpoints

### Generate Embedding
```typescript
POST /make-server-1f923fcd/embeddings/generate
Body: { text: string }
Response: { embedding: number[] }
```

### Store Document
```typescript
POST /make-server-1f923fcd/vectors/store
Body: {
  id: string
  content: string
  metadata: Record<string, any>
  module?: string
  embedding?: number[]
}
Response: { success: boolean, id: string }
```

### Search Vectors
```typescript
POST /make-server-1f923fcd/vectors/search
Body: {
  query: string
  limit?: number (default: 5)
  module?: string
  threshold?: number (default: 0.7)
}
Response: { results: VectorSearchResult[] }
```

### Delete Document
```typescript
DELETE /make-server-1f923fcd/vectors/delete
Body: { id: string }
Response: { success: boolean }
```

### Batch Store
```typescript
POST /make-server-1f923fcd/vectors/batch-store
Body: { documents: VectorDocument[] }
Response: { results: any[] }
```

## Usage Examples

### Frontend - Store a Document
```typescript
import { storeDocument } from './utils/supabase/vector_store';

await storeDocument({
  id: 'lead-123',
  content: 'High-value lead from textile sector...',
  metadata: {
    type: 'lead',
    company: 'Apex Garments',
    fitScore: 92
  },
  module: 'lead-management'
});
```

### Frontend - Search Similar Documents
```typescript
import { searchSimilar } from './utils/supabase/vector_store';

const results = await searchSimilar('textile manufacturing leads', {
  limit: 5,
  module: 'lead-management',
  threshold: 0.7
});
```

### React Hook Usage
```typescript
import { useVectorStore } from './utils/supabase/useVectorStore';

function MyComponent() {
  const { search, storeDoc, isLoading, error } = useVectorStore();
  
  const handleSearch = async () => {
    const results = await search('my query', {
      limit: 10,
      module: 'buyer-management'
    });
    console.log(results);
  };
}
```

### AI Context Retrieval
```typescript
import { getAIContext } from './utils/supabase/vector_store';

const context = await getAIContext(
  'What are the top performing suppliers?',
  'supplier-evaluation'
);
// Returns formatted context string for AI
```

## Vector Database Admin Panel

Access via: **Settings → Vector DB**

### Features:
1. **Seed Database** - Populate with sample data for all modules
2. **Search Interface** - Test semantic search with live results
3. **Module-Specific Seeding** - Seed individual modules
4. **Results Display** - View similarity scores and metadata

### Seeding Database
```typescript
import { seedVectorDatabase } from './utils/supabase/seedVectorData';

// Seed all modules
await seedVectorDatabase();

// Seed specific module
import { seedModuleData } from './utils/supabase/seedVectorData';
await seedModuleData('lead-management');
```

## Data Structure

### VectorDocument
```typescript
interface VectorDocument {
  id: string;                    // Unique identifier
  content: string;               // Text content to embed
  metadata: Record<string, any>; // Custom metadata
  embedding?: number[];          // 384-dim vector
  module?: string;               // Module name
  timestamp?: Date;              // Creation time
}
```

### VectorSearchResult
```typescript
interface VectorSearchResult {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;  // 0-1 score
}
```

## Storage

Documents are stored in the KV store with the following pattern:
- Document key: `vector:{id}`
- Module index: `vector_index:{module}`

Example:
```
vector:lead-001 → { id, content, embedding, metadata, ... }
vector_index:lead-management → { ids: ['lead-001', 'lead-002'] }
```

## Similarity Algorithm

Uses **Cosine Similarity** for vector comparison:

```
similarity = (A · B) / (||A|| × ||B||)
```

Where:
- A, B are embedding vectors
- · is dot product
- ||x|| is vector magnitude

Results range from 0 (not similar) to 1 (identical).

## Best Practices

### 1. Document Content
- Keep content descriptive and contextual
- Include key information: names, dates, metrics
- Optimal length: 100-500 words per document

### 2. Metadata
- Store searchable attributes separately
- Use consistent naming conventions
- Include module, type, timestamp

### 3. Search Queries
- Be specific but not overly detailed
- Use natural language
- Adjust threshold based on use case:
  - 0.9+ : Very strict matching
  - 0.7-0.9 : Recommended range
  - 0.5-0.7 : Broader results

### 4. Performance
- Batch operations when possible
- Cache frequently accessed embeddings
- Index documents by module for faster filtering

## Integration with AI Assistant

The AI Assistant Panel automatically:
1. Receives user query
2. Searches vector database for relevant context
3. Provides top 3 results to AI
4. Displays context indicator in response

This enhances AI responses with:
- Real-time ERP data
- Historical information
- Related documents
- Contextual insights

## Future Enhancements

1. **OpenAI Integration** - Replace simple embedding with GPT embeddings
2. **Real-time Indexing** - Auto-embed new data as it's created
3. **Advanced Filters** - Date ranges, complex metadata queries
4. **Analytics Dashboard** - Usage metrics, popular queries
5. **Vector Clustering** - Group similar documents automatically

## Troubleshooting

### Issue: Search returns no results
- Check if database is seeded
- Lower similarity threshold
- Verify module name matches exactly

### Issue: Slow search performance
- Reduce search limit
- Use module-specific search
- Check document count per module

### Issue: Low similarity scores
- Embeddings may need regeneration
- Query may be too vague
- Consider alternate phrasing

## Support

For questions or issues:
1. Check console logs for detailed errors
2. Use Vector DB Admin panel for testing
3. Review sample seed data in `/utils/supabase/seedVectorData.tsx`

---

**Last Updated:** October 28, 2025  
**Version:** 1.0.0
