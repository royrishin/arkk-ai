import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowLeft, Zap, Activity, BarChart3 } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Voltage (V_bus_x)",
      description: "Measures the electric potential at a bus.",
      details: "Drops or spikes in voltage can signal instability or disconnection (e.g., in Load-Loss).",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-ai-primary"
    },
    {
      title: "Frequency (F_bus_x)",
      description: "Measures the rate of change of the AC signal at the bus.",
      details: "Frequency deviations are often seen during Generator Outages, since generators help maintain system frequency.",
      icon: <Activity className="h-8 w-8" />,
      color: "bg-neural-purple"
    },
    {
      title: "Phase Angle (P_bus_x)",
      description: "Measures the phase difference of voltage between buses.",
      details: "Phase shifts can reveal how power flows are rerouting due to the fault.",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-neural-cyan"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-ai-primary to-neural-purple">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
                ARKKAI
              </span>
            </Link>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-ai-primary/10 via-neural-purple/10 to-ai-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Brain className="mr-2 h-4 w-4" />
              Electrical Parameters
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
              Key Electrical Features
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understanding the critical electrical parameters that our AI analyzes to detect and classify power system faults
            </p>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-neural-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-ai-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <CardDescription className="text-base leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.details}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ai-primary via-neural-purple to-ai-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Analyze These Parameters?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Use our AI-powered classifier to analyze voltage, frequency, and phase angle data for fault detection.
            </p>
            <Link to="/classifier">
              <Button 
                size="lg" 
                className="bg-white text-ai-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                <Brain className="mr-2 h-5 w-5" />
                Launch Classifier
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;