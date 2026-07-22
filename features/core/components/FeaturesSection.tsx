import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { Zap, ShieldCheck, Clock, CreditCard } from "lucide-react";
import { Container } from "@/components/layout/container";

export function FeaturesSection() {
  const features = [
    {
      title: "Instant Delivery",
      description: "Get your digital assets, license keys, and downloads immediately after purchase via email and dashboard.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Secure Payments",
      description: "We use industry-leading encryption and Stripe to ensure your payment information is always protected.",
      icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Genuine Licenses",
      description: "All our software licenses and API keys are 100% genuine and verified directly from the manufacturers.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "24/7 Premium Support",
      description: "Our dedicated support team is available around the clock to assist you with installation and troubleshooting.",
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
    },
  ];

  return (
    <section className="bg-muted/30 py-12 md:py-20 border-b border-border">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Why choose DigitalStore?</h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">We provide the best digital shopping experience with zero compromises.</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="bg-muted w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
