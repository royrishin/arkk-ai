import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Shield, BarChart3, ArrowRight, CheckCircle, Activity, Target } from 'lucide-react';
import heroBackground from '@/assets/hero-bg.jpg';
import faultIcon from '@/assets/fault-icon.jpg';
import realtimeIcon from '@/assets/realtime-icon.jpg';
import accuracyIcon from '@/assets/accuracy-icon.jpg';

const Homepage: React.FC = () => {
  const features = [
    {
      icon: <img src={faultIcon} alt="Fault Detection" className="w-12 h-12 rounded-lg object-cover" />,
      title: "Advanced Fault Detection",
      description: "AI-powered neural networks trained to identify electrical faults with precision and speed",
      stats: "99.2% Accuracy"
    },
    {
      icon: <img src={realtimeIcon} alt="Real-time Analysis" className="w-12 h-12 rounded-lg object-cover" />,
      title: "Real-time Analysis",
      description: "Instant fault classification from electrical signal measurements in milliseconds",
      stats: "<100ms Response"
    },
    {
      icon: <img src={accuracyIcon} alt="Machine Learning" className="w-12 h-12 rounded-lg object-cover" />,
      title: "Machine Learning Precision",
      description: "Trained on thousands of electrical fault patterns using TensorFlow and Keras",
      stats: "3 Fault Classes"
    }
  ];

  const faultTypes = [
    { 
      name: "LL: Load-Loss", 
      description: "Load shedding or disconnection causing sudden rise in voltage and frequency due to reduced demand while maintaining generation output", 
      color: "bg-ai-warning" 
    },
    { 
      name: "GO: Generator Outage", 
      description: "Generator unit going offline unexpectedly, causing voltage and frequency drop as supply decreases while demand remains constant", 
      color: "bg-ai-error" 
    },
    { 
      name: "GG: Generator Ground", 
      description: "Live generator component contacting grounded frame, resulting in abnormal current flows and phase angle distortions", 
      color: "bg-neural-purple" 
    }
  ];

  const stats = [
    { number: "25", label: "Input Features", icon: <BarChart3 className="h-6 w-6" /> },
    { number: "3", label: "Fault Types", icon: <Zap className="h-6 w-6" /> },
    { number: "99.2%", label: "Accuracy", icon: <Target className="h-6 w-6" /> },
    { number: "<100ms", label: "Response Time", icon: <Activity className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-ai-primary to-neural-purple">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
                FaultAI
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link to="/classifier">
                <Button className="bg-gradient-to-r from-ai-primary to-neural-purple hover:from-ai-primary-dark hover:to-neural-purple text-white">
                  Try Classifier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Brain className="mr-2 h-4 w-4" />
              AI-Powered Fault Detection
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-ai-primary via-neural-purple to-ai-primary-light bg-clip-text text-transparent leading-tight">
              Neural Network
              <br />
              Fault Classifier
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI system that analyzes electrical signals to detect and classify faults in real-time with industry-leading accuracy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/classifier">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-ai-primary to-neural-purple hover:from-ai-primary-dark hover:to-neural-purple text-white px-8 py-6 text-lg animate-pulse-glow"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Fault Analysis
                </Button>
              </Link>
              <Link to="/fault-types">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 text-lg border-ai-primary hover:bg-ai-primary hover:text-white"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center text-ai-primary mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating neural network elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-ai-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-neural-purple rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-neural-cyan rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-neural-orange rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }} />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our neural network has been trained on extensive datasets to provide unmatched fault detection accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-neural-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    {feature.icon}
                    <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary">
                      {feature.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-ai-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fault Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Detectable Fault Types</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI can classify three different types of electrical faults with high precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faultTypes.map((fault, index) => (
              <Card 
                key={fault.name} 
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${fault.color}`} />
                    <CardTitle className="text-lg">{fault.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {fault.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple three-step process powered by advanced machine learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Features",
                description: "Enter 25 electrical signal measurements including voltage, current, frequency, power, and THD values",
                icon: <BarChart3 className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "AI Processing",
                description: "Our trained neural network analyzes the patterns using TensorFlow/Keras machine learning algorithms",
                icon: <Brain className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Fault Classification",
                description: "Receive instant results with fault type classification and confidence probability scores",
                icon: <CheckCircle className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div 
                key={step.step} 
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-ai-primary to-neural-purple rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-neural-orange rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-ai-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ai-primary via-neural-purple to-ai-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Analyze Electrical Faults?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the power of AI-driven fault detection. Start classifying electrical faults in seconds.
            </p>
            <Link to="/classifier">
              <Button 
                size="lg" 
                className="bg-white text-ai-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                <Zap className="mr-2 h-5 w-5" />
                Launch Fault Classifier
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ai-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 rounded-lg bg-gradient-to-r from-ai-primary to-neural-purple">
                <Brain className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">FaultAI</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/80 mb-2">
                Advanced AI-powered electrical fault classification
              </p>
              <p className="text-white/60 text-sm">
                Built with TensorFlow • Keras • React • TypeScript
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;