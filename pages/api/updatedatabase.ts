import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextApiRequest, NextApiResponse } from "next";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from "@pinecone-database/pinecone";
import { updateVectorDB } from "@/utils";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { indexName, namespace } = JSON.parse(req.body);
  await handleUpload(indexName, namespace, res);
}

async function handleUpload(
  indexName: string,
  namespace: string,
  res: NextApiResponse
) {
  const loader = new DirectoryLoader("./documents", {
    ".pdf": (path: string) => new PDFLoader(path, { splitPages: false }),
    ".txt": (path: string) => new TextLoader(path),
  });
  const docs = await loader.load();
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
  await updateVectorDB(
    client,
    indexName,
    namespace,
    docs,
    (filename, totalChunks, chunksUpserted, isComplete) => {
      if (!isComplete) {
        res.write(
          JSON.stringify({
            filename,
            totalChunks,
            chunksUpserted,
            isComplete,
          })
        );
      } else {
        res.end();
      }
    }
  );
}
