import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import {
  pipeline,
  env,
  FeatureExtractionPipeline,
} from "@huggingface/transformers";

export async function updateVectorDB(
  client: Pinecone,
  indexName: string,
  namespace: string,
  docs: Document[],
  progress_callback: (
    filename: string,
    totalChunks: number,
    chunksUpserted: number,
    isComplete: boolean
  ) => void
) {
  const modelname = "mixedbread-ai/mxbai-embed-large-v1";
  const extractor = await pipeline("feature-extraction", modelname, {
    progress_callback,
  });
  console.log(extractor);
  for (const doc of docs) {
    await processDocument(client, indexName, namespace, doc, extractor);
  }
}
function processDocument(
  client: Pinecone,
  indexName: string,
  namespace: string,
  doc: Document<Record<string, any>>,
  extractor: FeatureExtractionPipeline
) {
  console.log(doc);
}
