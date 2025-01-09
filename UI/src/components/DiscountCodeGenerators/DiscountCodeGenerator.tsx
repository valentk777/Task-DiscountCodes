import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { GenerateResponse } from "src/models/generateResponse";
import { GenerateRequest } from "src/models/generateRequest";

interface DiscountCodeGeneratorProps {
  generateDiscountCode: (request: GenerateRequest) => void;
  events: (callback: (response: GenerateResponse) => void) => void;
}

const DiscountCodeGenerator: React.FC<DiscountCodeGeneratorProps> = ({
  generateDiscountCode,
  events,
}) => {
  const [generateResponse, setGenerateResponse] = useState<GenerateResponse | null>(null);
  const [count, setCount] = useState("");
  const [length, setLength] = useState(7);

  useEffect(() => {
    events((response) => setGenerateResponse(response));
  }, [events]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateDiscountCode({ count: parseInt(count, 10), length });
  };

  return (
    <Card className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-zinc-700 shadow-xl">
      <CardHeader className="border-b border-zinc-700/50">
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Generate Discount Codes
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Create multiple discount codes at once
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-zinc-300">Code Length</label>
              <div className="flex gap-2">
                {[7, 8].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={length === value ? "default" : "outline"}
                    onClick={() => setLength(value)}
                    className={`w-20 ${
                      length === value
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                        : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    {value} chars
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-zinc-300">
                Number of Codes
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="max-w-xs bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20"
          >
            Generate Codes
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>

          {generateResponse && (
            <Alert
              variant={generateResponse.result ? "default" : "destructive"}
              className={`border ${
                generateResponse.result
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                  : "bg-red-500/10 border-red-500/50 text-red-300"
              }`}
            >
              <AlertTitle className="flex items-center">
                {generateResponse.result ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {generateResponse.result ? "Success!" : "Error"}
              </AlertTitle>
              <AlertDescription>
                {generateResponse.result
                  ? "Codes generated successfully"
                  : "Issues generating codes"}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscountCodeGenerator;
