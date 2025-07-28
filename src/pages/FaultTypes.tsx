import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowLeft, Zap, AlertTriangle, Power } from 'lucide-react';

const FaultTypes: React.FC = () => {
  const faultDefinitions = [
    {
      code: "LL",
      name: "Load-Loss (Load Shedding or Load Disconnection)",
      icon: <Zap className="h-8 w-8 text-ai-warning" />,
      color: "from-ai-warning to-neural-orange",
      whatItMeans: "A Load-Loss occurs when a section of the power system suddenly loses electrical demand — in other words, some of the loads (like houses, factories, or other consumers) are disconnected.",
      whyItHappens: "This can occur due to system protection mechanisms, damaged power lines, or emergency shutdowns to prevent grid overload.",
      effectOnSystem: "Causes a sudden rise in voltage and frequency in nearby buses, since the generators are still producing the same power but there is now less demand to absorb it. This imbalance is detectable through monitoring."
    },
    {
      code: "GO",
      name: "Generator Outage",
      icon: <Power className="h-8 w-8 text-ai-error" />,
      color: "from-ai-error to-neural-purple",
      whatItMeans: "A Generator Outage happens when one or more power-generating units unexpectedly go offline and stop supplying electricity to the grid.",
      whyItHappens: "Mechanical failure, maintenance issues, overheating, or faults in the generator's protection system.",
      effectOnSystem: "Leads to a drop in voltage and frequency around the affected area, as the overall supply of power decreases while demand remains the same. This imbalance strains the rest of the system and can propagate quickly."
    },
    {
      code: "GG", 
      name: "Generator Ground",
      icon: <AlertTriangle className="h-8 w-8 text-neural-purple" />,
      color: "from-neural-purple to-ai-primary",
      whatItMeans: "Generator Ground Fault occurs when a live component inside a generator accidentally makes contact with the grounded frame or earth.",
      whyItHappens: "Due to insulation failure, moisture, mechanical damage, or deterioration over time.",
      effectOnSystem: "Results in abnormal current flows and phase angle distortions. If not quickly isolated, it can severely damage equipment and create dangerous fault currents. The electrical signature is distinct due to the grounding."
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
                FaultAI
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/classifier">
                <Button className="bg-gradient-to-r from-ai-primary to-neural-purple hover:from-ai-primary-dark hover:to-neural-purple text-white">
                  Try Classifier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-ai-primary hover:text-ai-primary-dark transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-ai-primary to-neural-purple bg-clip-text text-transparent">
              Electrical Fault Types
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guide to the three types of electrical faults detected by our AI system
            </p>
          </div>
        </div>
      </section>

      {/* Fault Definitions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {faultDefinitions.map((fault, index) => (
              <Card 
                key={fault.code} 
                className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${fault.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${fault.color} bg-opacity-10`}>
                      {fault.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl group-hover:text-ai-primary transition-colors">
                        {fault.code}: {fault.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <div className="grid gap-6 md:grid-cols-1">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-ai-primary mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-ai-primary"></div>
                          What it means
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-4">
                          {fault.whatItMeans}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neural-orange mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-neural-orange"></div>
                          Why it happens
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-4">
                          {fault.whyItHappens}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neural-purple mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-neural-purple"></div>
                          Effect on the system
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-4">
                          {fault.effectOnSystem}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ai-primary via-neural-purple to-ai-primary-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Classify These Faults?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Use our AI-powered classifier to detect and analyze these electrical fault types in real-time.
            </p>
            <Link to="/classifier">
              <Button 
                size="lg" 
                className="bg-white text-ai-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                <Zap className="mr-2 h-5 w-5" />
                Launch Fault Classifier
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaultTypes;