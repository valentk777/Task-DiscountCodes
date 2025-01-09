import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import DiscountCodeGenerator from 'src/components/DiscountCodeGenerators/DiscountCodeGenerator';
import DiscountCodeValidator from 'src/components/DiscountCodeValidators/DiscountCodeValidator';
import Connector from 'src/services/generateDiscountCodeConnection';
import ValidatorConnector from 'src/services/validateDiscountCodeConnection';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const generatorConnector = Connector();
  const validatorConnector = ValidatorConnector();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Tabs defaultValue="generate" className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="generate" className={styles.tabsTrigger}>
              Generate Codes
            </TabsTrigger>
            <TabsTrigger value="validate" className={styles.tabsTrigger}>
              Validate Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className={styles.tabsContent}>
            <DiscountCodeGenerator
              generateDiscountCode={generatorConnector.generateDiscountCode}
              events={generatorConnector.events}
            />
          </TabsContent>
          
          <TabsContent value="validate" className={styles.tabsContent}>
            <DiscountCodeValidator
              validateDiscountCode={validatorConnector.validateDiscountCode}
              events={validatorConnector.events}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
