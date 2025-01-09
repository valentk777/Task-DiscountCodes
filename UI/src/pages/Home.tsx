import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiscountCodeGenerator from "../components/DiscountCodeGenerators/DiscountCodeGenerator";
import DiscountCodeValidator from "../components/DiscountCodeValidators/DiscountCodeValidator";

const Home = () => {
  const generatorConnector = {
    generateDiscountCode: () => {},
    events: () => {},
  };

  const validatorConnector = {
    validateDiscountCode: () => {},
    events: () => {},
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-zinc-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50 border border-zinc-700">
            <TabsTrigger
              value="generate"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-zinc-400"
            >
              Generate Codes
            </TabsTrigger>
            <TabsTrigger
              value="validate"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-zinc-400"
            >
              Validate Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <DiscountCodeGenerator
              generateDiscountCode={generatorConnector.generateDiscountCode}
              events={generatorConnector.events}
            />
          </TabsContent>

          <TabsContent value="validate" className="mt-6">
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
