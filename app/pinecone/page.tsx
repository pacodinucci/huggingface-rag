"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Database,
  DatabaseIcon,
  LucideLoader2,
  MoveUp,
  RefreshCcw,
} from "lucide-react";
import React, { useState } from "react";

type Props = {};

const VectorDBPage = (props: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [indexName, setIndexName] = useState("");
  const [namespace, setNamespace] = useState("");

  const onStartUpload = async () => {
    const response = await fetch("/api/updatedatabase", {
      method: "POST",
      body: JSON.stringify({
        indexName,
        namespace,
      }),
    });
    console.log(response);
    // await processStreamedProgress(response);
  };

  return (
    <main className="flex flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Update Knwoledge Base</CardTitle>
          <CardDescription>Add new document to your vector DB</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-4 border rounded-lg p-6">
              <div className="gap-4 relative">
                <Button
                  className="absolute -right-4 -top-4"
                  variant="ghost"
                  size="icon"
                >
                  <RefreshCcw />
                </Button>
                <Label>Files List:</Label>
                <Textarea
                  readOnly
                  className="min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Index Name</Label>
                  <Input
                    placeholder="Index name"
                    value={indexName}
                    onChange={(e) => setIndexName(e.target.value)}
                    disabled={isUploading}
                    className="disabled:cursor-default"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Namespace</Label>
                  <Input
                    placeholder="Namespace"
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    disabled={isUploading}
                    className="disabled:cursor-default"
                  />
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-full"
              disabled={isUploading}
              onClick={onStartUpload}
            >
              <span className="flex flex-row">
                <Database size={50} className="stroke-[#D90013]" />
                <MoveUp className="stroke-[#D90013]" />
              </span>
            </Button>
          </div>
          {isUploading && (
            <div className="mt-4">
              <Label>File Name:</Label>
              <div className="flex flex-row items-center gap-4">
                <Progress value={80} />
                <LucideLoader2 className="stroke-[#D90013] animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default VectorDBPage;
