import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Brain, Zap, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock feature names - replace with your actual feature names
const FEATURE_NAMES = [
  'V_bus_1', 'V_bus_2', 'V_bus_3', 'V_bus_4', 'V_bus_5',
  'I_bus_1', 'I_bus_2', 'I_bus_3', 'I_bus_4', 'I_bus_5',
  'F_bus_1', 'F_bus_2', 'F_bus_3', 'F_bus_4', 'F_bus_5',
  'P_bus_1', 'P_bus_2', 'P_bus_3', 'P_bus_4', 'P_bus_5',
  'THD_1', 'THD_2', 'THD_3', 'THD_4', 'THD_5'
];

// Mock fault classes - replace with your actual classes
const FAULT_CLASSES = [
  'No Fault',
  'L-L Fault',
  'L-G Fault', 
  'L-L-G Fault',
  'L-L-L Fault',
  'L-L-L-G Fault'
];

interface PredictionResult {
  predicted_class: string;
  confidence: number;
  probabilities: { [key: string]: number };
}

const FaultClassifier: React.FC = () => {
  const [features, setFeatures] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (featureName: string, value: string) => {
    setFeatures(prev => ({
      ...prev,
      [featureName]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs
      const missingFeatures = FEATURE_NAMES.filter(name => !features[name] || features[name].trim() === '');
      if (missingFeatures.length > 0) {
        toast({
          title: "Missing Features",
          description: `Please fill in all ${FEATURE_NAMES.length} feature values.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Convert to array of numbers
      const featureArray = FEATURE_NAMES.map(name => parseFloat(features[name]));
      
      // Check for invalid numbers
      if (featureArray.some(val => isNaN(val))) {
        toast({
          title: "Invalid Input",
          description: "All features must be valid numbers.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Mock API call - replace with actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
      
      // Mock prediction result - replace with actual API response
      const mockResult: PredictionResult = {
        predicted_class: FAULT_CLASSES[Math.floor(Math.random() * FAULT_CLASSES.length)],
        confidence: 0.85 + Math.random() * 0.14, // Random confidence between 85-99%
        probabilities: FAULT_CLASSES.reduce((acc, className) => {
          acc[className] = Math.random();
          return acc;
        }, {} as { [key: string]: number })
      };

      // Normalize probabilities to sum to 1
      const total = Object.values(mockResult.probabilities).reduce((sum, val) => sum + val, 0);
      Object.keys(mockResult.probabilities).forEach(key => {
        mockResult.probabilities[key] = mockResult.probabilities[key] / total;
      });

      setResult(mockResult);
      toast({
        title: "Prediction Complete",
        description: `Fault classified as: ${mockResult.predicted_class}`,
      });

    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to classify fault. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures({});
    setResult(null);
  };

  const getFaultIcon = (faultClass: string) => {
    if (faultClass === 'No Fault') return <CheckCircle className="h-5 w-5 text-ai-success" />;
    return <XCircle className="h-5 w-5 text-ai-error" />;
  };

  const getFaultColor = (faultClass: string) => {
    if (faultClass === 'No Fault') return 'bg-ai-success';
    return 'bg-ai-error';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-ai-primary/5 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-ai-primary to-ai-primary-glow shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-primary to-ai-primary-glow bg-clip-text text-transparent">
              Fault Classifier AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter electrical signal features to classify the fault type using our trained neural network model
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-ai-primary" />
                Feature Input
              </CardTitle>
              <CardDescription>
                Enter the electrical signal measurements for fault classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {FEATURE_NAMES.map((featureName, index) => (
                    <div key={featureName} className="space-y-2">
                      <Label htmlFor={featureName} className="text-sm font-medium">
                        {featureName}
                      </Label>
                      <Input
                        id={featureName}
                        type="number"
                        step="any"
                        placeholder="0.0"
                        value={features[featureName] || ''}
                        onChange={(e) => handleInputChange(featureName, e.target.value)}
                        className="transition-all duration-200 focus:ring-2 focus:ring-ai-primary/50"
                        required
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-ai-primary to-ai-primary-glow hover:from-ai-primary/90 hover:to-ai-primary-glow/90 text-white font-medium"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Classifying...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Predict Fault
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleReset}
                    className="px-6"
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-ai-accent" />
                Prediction Results
              </CardTitle>
              <CardDescription>
                AI model classification and confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Main Prediction */}
                  <div className="text-center p-6 rounded-lg bg-gradient-to-r from-ai-primary/10 to-ai-primary-glow/10 border border-ai-primary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getFaultIcon(result.predicted_class)}
                      <h3 className="text-2xl font-bold text-foreground">
                        {result.predicted_class}
                      </h3>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {(result.confidence * 100).toFixed(1)}% Confidence
                    </Badge>
                  </div>

                  {/* Probability Distribution */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Class Probabilities</h4>
                    {Object.entries(result.probabilities)
                      .sort(([,a], [,b]) => b - a)
                      .map(([className, probability]) => (
                      <div key={className} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{className}</span>
                          <span>{(probability * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={probability * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Enter feature values and click "Predict Fault" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Integration Guide */}
        <Card className="mt-8 border-ai-primary/20 bg-ai-primary/5">
          <CardHeader>
            <CardTitle className="text-ai-primary">Backend Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>API Endpoint:</strong> Replace the mock prediction with POST to your Flask/FastAPI backend</p>
            <p><strong>Expected Format:</strong> Send feature array as JSON to /predict endpoint</p>
            <p><strong>Feature Names:</strong> Update FEATURE_NAMES array to match your model's training features</p>
            <p><strong>Fault Classes:</strong> Update FAULT_CLASSES array to match your label encoder classes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaultClassifier;