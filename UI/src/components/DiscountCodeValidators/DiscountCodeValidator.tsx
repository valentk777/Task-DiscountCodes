import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Ticket } from "lucide-react";
import { UseCodeResponse } from "src/models/useCodeResponse";
import { UseCodeRequest } from "src/models/useCodeRequest";

interface DiscountCodeValidatorProps {
  validateDiscountCode: (request: UseCodeRequest) => void;
  events: (callback: (response: UseCodeResponse) => void) => void;
}

const DiscountCodeValidator: React.FC<DiscountCodeValidatorProps> = ({
  validateDiscountCode,
  events,
}) => {
  const [validateCodeResponse, setValidateCodeResponse] = useState<UseCodeResponse>(
    {} as UseCodeResponse
  );
  const [code, setCode] = useState("");

  useEffect(() => {
    events((response) => setValidateCodeResponse(response));
  }, [events]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateDiscountCode({ code });
  };

  return (
    <Card className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-zinc-700 shadow-xl">
      <CardHeader className="border-b border-zinc-700/50">
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Ticket className="w-5 h-5 text-blue-400" />
          Validate Discount Code
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Check if your discount code is valid
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block text-zinc-300">Discount Code</label>
            <Input
              placeholder="Enter your code"
              onChange={(e) => setCode(e.target.value)}
              className="uppercase bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/20"
          >
            Validate Code
            <Ticket className="w-4 h-4 ml-2" />
          </Button>

          {validateCodeResponse.result !== undefined && (
            <Alert
              variant={validateCodeResponse.result === 1 ? "default" : "destructive"}
              className={`border ${
                validateCodeResponse.result === 1
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                  : "bg-red-500/10 border-red-500/50 text-red-300"
              }`}
            >
              <AlertTitle className="flex items-center">
                {validateCodeResponse.result === 1 ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {validateCodeResponse.result === 1 ? "Valid Code" : "Invalid Code"}
              </AlertTitle>
              <AlertDescription>
                {validateCodeResponse.result === 1
                  ? "Your provided code is valid!"
                  : "Your provided code is invalid"}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscountCodeValidator;
