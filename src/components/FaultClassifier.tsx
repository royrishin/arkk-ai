import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Brain, Zap, CheckCircle, XCircle, ArrowLeft, Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Feature inputs for the fault classifier
const FEATURE_NAMES = [
  'Voltage (V)',
  'Frequency (Hz)',
  'Phase Angle (degrees)',
  'Bus System (1-118)'
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

      // Validate bus system range (1-118)
      const busSystemValue = parseFloat(features['Bus System (1-118)']);
      if (busSystemValue < 1 || busSystemValue > 118 || !Number.isInteger(busSystemValue)) {
        toast({
          title: "Invalid Bus System",
          description: "Bus system must be an integer between 1 and 118.",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-ai-primary/5">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 rounded-lg bg-gradient-to-r from-ai-primary to-neural-purple">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
                ARKKAI
              </span>
            </Link>
          </div>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-ai-primary to-neural-purple shadow-lg animate-pulse-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
              Neural Network Fault Classifier
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered electrical fault detection and classification system
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary">
              <Zap className="mr-1 h-3 w-3" />
              Real-time Analysis
            </Badge>
            <Badge variant="secondary" className="bg-neural-purple/10 text-neural-purple">
              <Brain className="mr-1 h-3 w-3" />
              99.2% Accuracy
            </Badge>
          </div>
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
                <div className="grid grid-cols-1 gap-4">
                  {FEATURE_NAMES.map((featureName, index) => (
                    <div key={featureName} className="space-y-2">
                      <Label htmlFor={featureName} className="text-sm font-medium">
                        {featureName}
                      </Label>
                      <Input
                        id={featureName}
                        type="number"
                        step={featureName === 'Bus System (1-118)' ? '1' : 'any'}
                        placeholder={featureName === 'Bus System (1-118)' ? '1-118' : '0.0'}
                        min={featureName === 'Bus System (1-118)' ? '1' : undefined}
                        max={featureName === 'Bus System (1-118)' ? '118' : undefined}
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
                    className="flex-1 bg-gradient-to-r from-ai-primary to-neural-purple hover:from-ai-primary-dark hover:to-neural-purple text-white font-medium"
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