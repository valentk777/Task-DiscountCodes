import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { CheckCircle2, XCircle, Ticket } from "lucide-react";
import { UseCodeResponse } from "src/models/useCodeResponse";
import { UseCodeRequest } from "src/models/useCodeRequest";
import styles from "./DiscountCodeValidator.module.scss";

interface DiscountCodeValidatorProps {
  validateDiscountCode: (request: UseCodeRequest) => void;
  events: (callback: (response: UseCodeResponse) => void) => void;
}

const DiscountCodeValidator: React.FC<DiscountCodeValidatorProps> = ({ 
  validateDiscountCode, 
  events 
}) => {
  const [validateCodeResponse, setValidateCodeResponse] = useState<UseCodeResponse>({} as UseCodeResponse);
  const [code, setCode] = useState("");

  useEffect(() => {
    events((response) => setValidateCodeResponse(response));
  }, [events]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateDiscountCode({ code });
  };

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          <Ticket className={styles.icon} />
          Validate Discount Code
        </CardTitle>
        <CardDescription className={styles.cardDescription}>
          Check if your discount code is valid
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Discount Code</label>
            <Input
              placeholder="Enter your code"
              onChange={(e: any) => setCode(e.target.value)}
              className={styles.input}
            />
          </div>

          <Button type="submit" className={styles.submitButton}>
            Validate Code
            <Ticket className={styles.buttonIcon} />
          </Button>

          {validateCodeResponse.result !== undefined && (
            <Alert className={`${styles.alert} ${validateCodeResponse.result === 1 ? styles.successAlert : styles.errorAlert}`}>
              <AlertTitle className={styles.alertTitle}>
                {validateCodeResponse.result === 1 ? (
                  <CheckCircle2 className={styles.alertIcon} />
                ) : (
                  <XCircle className={styles.alertIcon} />
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