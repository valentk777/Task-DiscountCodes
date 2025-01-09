import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { GenerateResponse } from "src/models/generateResponse";
import { GenerateRequest } from "src/models/generateRequest";
import styles from './DiscountCodeGenerator.module.scss';

interface DiscountCodeGeneratorProps {
  generateDiscountCode: (request: GenerateRequest) => void;
  events: (callback: (response: GenerateResponse) => void) => void;
}

const DiscountCodeGenerator: React.FC<DiscountCodeGeneratorProps> = ({ 
  generateDiscountCode, 
  events 
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
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          <Sparkles className={styles.icon} />
          Generate Discount Codes
        </CardTitle>
        <CardDescription className={styles.cardDescription}>
          Create multiple discount codes at once
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.label}>Code Length</label>
              <div className={styles.buttonGroup}>
                {[7, 8].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => setLength(value)}
                    className={`${styles.lengthButton} ${length === value ? styles.activeButton : ''}`}
                  >
                    {value} chars
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className={styles.label}>Number of Codes</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={count}
                onChange={(e: any) => setCount(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <Button type="submit" className={styles.submitButton}>
            Generate Codes
            <Sparkles className={styles.buttonIcon} />
          </Button>

          {generateResponse && (
            <Alert className={`${styles.alert} ${generateResponse.result ? styles.successAlert : styles.errorAlert}`}>
              <AlertTitle className={styles.alertTitle}>
                {generateResponse.result ? (
                  <CheckCircle2 className={styles.alertIcon} />
                ) : (
                  <XCircle className={styles.alertIcon} />
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