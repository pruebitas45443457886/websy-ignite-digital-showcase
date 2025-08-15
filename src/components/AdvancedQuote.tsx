import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Import UI components individually to avoid errors
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

import { toast } from "@/hooks/use-toast";
import { COLORS } from "@/lib/animation";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Code, 
  CreditCard, 
  Lightbulb, 
  MonitorSmartphone,
  Rocket,
  Send,
  Server, 
  ShieldCheck, 
  X,
  Zap
} from "lucide-react";

// Define schema for the form
const schema = z.object({
  // Step 1: Basic Information
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  phone: z.string().optional(),
  
  // Step 2: Project Details
  projectType: z.enum(['website', 'ecommerce', 'webapp', 'automation', 'whatsapp', 'other']),
  projectDescription: z.string().min(10, "Proporciona más detalles sobre tu proyecto"),
  projectTimeframe: z.enum(['urgent', 'normal', 'flexible']),
  
  // Step 3: Budget and Preferences
  budget: z.number().min(500),
  hasDesign: z.boolean().default(false),
  hasContent: z.boolean().default(false),
  integrationsNeeded: z.array(z.string()).default([]),
  
  // Step 4: Additional Services
  maintenancePlan: z.boolean().default(false),
  seoServices: z.boolean().default(false),
  analyticsSetup: z.boolean().default(false),
  hostingPreference: z.enum(['cloud', 'selfhosted', 'undecided']).default('undecided'),
});

// Define type based on schema
type QuoteFormData = z.infer<typeof schema>;

// Project type options
const projectTypes = [
  { id: 'website', label: 'Sitio Web', icon: <MonitorSmartphone className="w-5 h-5" />, description: 'Sitio web informativo o corporativo' },
  { id: 'ecommerce', label: 'E-commerce', icon: <CreditCard className="w-5 h-5" />, description: 'Tienda online con catálogo y pagos' },
  { id: 'webapp', label: 'Aplicación Web', icon: <Code className="w-5 h-5" />, description: 'App web con funcionalidades avanzadas' },
  { id: 'automation', label: 'Automatización', icon: <Server className="w-5 h-5" />, description: 'Automatización de procesos de negocio' },
  { id: 'whatsapp', label: 'Bot WhatsApp', icon: <Lightbulb className="w-5 h-5" />, description: 'Bot de WhatsApp para tu negocio' },
  { id: 'other', label: 'Otro', icon: <Rocket className="w-5 h-5" />, description: 'Otro tipo de proyecto' }
];

// Integration options
const integrations = [
  { id: 'payments', label: 'Pasarela de Pagos' },
  { id: 'crm', label: 'CRM' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'social', label: 'Redes Sociales' },
  { id: 'erp', label: 'ERP' }
];

// Time frames
const timeframes = [
  { id: 'urgent', label: 'Urgente', description: 'Necesito lanzar lo antes posible', icon: <Clock className="w-5 h-5 text-red-500" /> },
  { id: 'normal', label: 'Normal', description: '1-3 meses está bien', icon: <Clock className="w-5 h-5 text-yellow-500" /> },
  { id: 'flexible', label: 'Flexible', description: 'No tengo prisa, quiero calidad', icon: <Clock className="w-5 h-5 text-green-500" /> }
];

const AdvancedQuote = () => {
  // State for current form step
  const [step, setStep] = useState(1);
  const [quoteType, setQuoteType] = useState<'manual' | 'auto'>('manual');
  const [loading, setLoading] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<any>(null);
  
  // Form setup using react-hook-form
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: 'website',
      budget: 2000,
      projectTimeframe: 'normal',
      integrationsNeeded: [],
      hostingPreference: 'undecided'
    }
  });
  
  // Watch values for dynamic content
  const watchProjectType = watch('projectType');
  const watchBudget = watch('budget');
  const watchTimeframe = watch('projectTimeframe');
  
  // Handle form submission
  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    
    try {
      // In a real app, you'd send this data to an API
      console.log('Form data submitted:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simple quote
      const basePrice = data.budget;
      const timeline = data.projectTimeframe === 'urgent' ? 'express (2-3 semanas)' : 
                      data.projectTimeframe === 'normal' ? 'normal (1-2 meses)' : 
                      'extendido (2-3 meses)';
      
      const extras = [];
      if (data.maintenancePlan) extras.push('Plan de Mantenimiento Mensual');
      if (data.seoServices) extras.push('Servicios SEO');
      if (data.analyticsSetup) extras.push('Configuración de Analytics');
      
      // Set the generated quote
      setGeneratedQuote({
        projectType: projectTypes.find(p => p.id === data.projectType)?.label,
        estimatedPrice: basePrice,
        timeline: timeline,
        extras: extras,
        description: data.projectDescription
      });
      
      // Show success message
      toast({ 
        title: "¡Cotización generada!", 
        description: "Hemos creado una cotización personalizada para tu proyecto." 
      });
      
      // Move to results
      setStep(5);
    } catch (error) {
      toast({ 
        title: "Error al procesar", 
        description: "Hubo un problema al generar tu cotización. Intenta nuevamente.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Automatic quote generation
  const generateAutomaticQuote = async () => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you'd use AI to generate pricing
      const projectType = watch('projectType');
      const basePrice = 
        projectType === 'website' ? 1500 :
        projectType === 'ecommerce' ? 3500 :
        projectType === 'webapp' ? 5000 :
        projectType === 'automation' ? 2500 :
        projectType === 'whatsapp' ? 1800 : 3000;
      
      const timeline = 
        projectType === 'website' ? '3-4 semanas' :
        projectType === 'ecommerce' ? '6-8 semanas' :
        projectType === 'webapp' ? '8-12 semanas' :
        projectType === 'automation' ? '4-6 semanas' :
        projectType === 'whatsapp' ? '2-3 semanas' : '4-8 semanas';
      
      // Generate quote packages
      const packages = [
        {
          name: 'Básico',
          price: basePrice,
          features: [
            'Diseño Responsive',
            'Optimización SEO Básica',
            'Formulario de Contacto',
            'Hasta 5 páginas',
            'Soporte por 30 días'
          ]
        },
        {
          name: 'Profesional',
          price: basePrice * 1.8,
          features: [
            'Todo lo del plan Básico',
            'Diseño Premium Personalizado',
            'SEO Avanzado',
            'CMS para gestión de contenido',
            'Hasta 10 páginas',
            'Integración con Google Analytics',
            'Soporte por 90 días'
          ],
          recommended: true
        },
        {
          name: 'Enterprise',
          price: basePrice * 3,
          features: [
            'Todo lo del plan Profesional',
            'Diseño UX/UI Exclusivo',
            'Funcionalidades Avanzadas',
            'Páginas ilimitadas',
            'Integraciones personalizadas',
            'Optimización de velocidad premium',
            'Soporte prioritario por 12 meses'
          ]
        }
      ];
      
      // Ensure we have a proper projectType label
      const projectLabel = projectTypes.find(p => p.id === projectType)?.label || 'Proyecto';
      
      setGeneratedQuote({
        projectType: projectLabel,
        timeline: timeline,
        packages: packages
      });
      
      toast({ 
        title: "¡Cotización automática generada!", 
        description: "Hemos creado opciones de paquetes para tu proyecto." 
      });
      
      setStep(5);
    } catch (error) {
      toast({ 
        title: "Error al procesar", 
        description: "Hubo un problema al generar tu cotización. Intenta nuevamente.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Render different steps based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1: // Choose quote type
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 text-center">¿Cómo prefieres obtener tu cotización?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
              <Card 
                className={`cursor-pointer transition-all ${quoteType === 'manual' ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:scale-105'}`}
                onClick={() => setQuoteType('manual')}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Cotización Personalizada</CardTitle>
                    {quoteType === 'manual' && <CheckCircle2 className="text-primary h-6 w-6" />}
                  </div>
                  <CardDescription>Responde algunas preguntas para una cotización a medida</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-24">
                    <ClipboardIcon className="h-16 w-16 text-primary/20" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span className="text-sm">Detallada y personalizada</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span className="text-sm">Adaptada a tus necesidades exactas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setStep(2)}
                  >
                    Comenzar cuestionario <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${quoteType === 'auto' ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:scale-105'}`}
                onClick={() => setQuoteType('auto')}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Cotización Automática</CardTitle>
                    {quoteType === 'auto' && <CheckCircle2 className="text-primary h-6 w-6" />}
                  </div>
                  <CardDescription>Obtén una cotización instantánea basada en IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-24">
                    <RocketIcon className="h-16 w-16 text-primary/20" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span className="text-sm">Cotización instantánea</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span className="text-sm">Opciones de paquetes predefinidos</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      // Initialize empty state before transitioning
                      setGeneratedQuote(null);
                      
                      if (quoteType === 'auto') {
                        setStep(6);
                      } else {
                        setStep(2);
                      }
                    }}
                  >
                    Cotizar ahora <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Ambas opciones son gratuitas y sin compromiso.</p>
            </div>
          </div>
        );
        
      case 2: // Basic Information
        return (
          <>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                <Input 
                  placeholder="Tu nombre" 
                  {...register("name")} 
                  className={errors.name ? "border-red-500" : ""} 
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Profesional *</label>
                <Input 
                  placeholder="tu@empresa.com" 
                  {...register("email")} 
                  className={errors.email ? "border-red-500" : ""} 
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <Input placeholder="Nombre de tu empresa" {...register("company")} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <Input placeholder="+34 600 000 000" {...register("phone")} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
              >
                Atrás
              </Button>
              
              <Button 
                onClick={() => {
                  // Simple validation before proceeding
                  const nameValue = watch('name');
                  const emailValue = watch('email');
                  
                  if (!nameValue || nameValue.length < 2) {
                    toast({ title: "Nombre requerido", variant: "destructive" });
                    return;
                  }
                  
                  if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                    toast({ title: "Email válido requerido", variant: "destructive" });
                    return;
                  }
                  
                  setStep(3);
                }}
              >
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        );
        
      case 3: // Project Details
        return (
          <>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4">Tipo de Proyecto *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {projectTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        watchProjectType === type.id ? 
                        'border-primary bg-primary/10 ring-2 ring-primary/50' : 
                        'hover:border-primary/50 hover:bg-primary/5'
                      }`}
                      onClick={() => setValue('projectType', type.id as any, { shouldValidate: true })}
                    >
                      <div className="flex items-center gap-3">
                        {type.icon}
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-foreground-muted">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Descripción del Proyecto *</label>
                <Textarea 
                  placeholder="Describe brevemente tu proyecto, objetivos, funcionalidades clave..." 
                  rows={5}
                  {...register("projectDescription")}
                  className={errors.projectDescription ? "border-red-500" : ""}
                />
                {errors.projectDescription && (
                  <p className="text-sm text-red-500 mt-1">{errors.projectDescription.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-4">Plazo del Proyecto *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {timeframes.map((time) => (
                    <div 
                      key={time.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        watchTimeframe === time.id ? 
                        'border-primary bg-primary/10 ring-2 ring-primary/50' : 
                        'hover:border-primary/50 hover:bg-primary/5'
                      }`}
                      onClick={() => setValue('projectTimeframe', time.id as any, { shouldValidate: true })}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        {time.icon}
                        <div className="font-medium">{time.label}</div>
                        <div className="text-xs text-foreground-muted">{time.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
              >
                Atrás
              </Button>
              
              <Button 
                onClick={() => {
                  // Simple validation before proceeding
                  const descValue = watch('projectDescription');
                  
                  if (!descValue || descValue.length < 10) {
                    toast({ 
                      title: "Descripción requerida", 
                      description: "Por favor proporciona más detalles sobre tu proyecto",
                      variant: "destructive" 
                    });
                    return;
                  }
                  
                  setStep(4);
                }}
              >
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        );
        
      case 4: // Budget and Additional Services
        return (
          <>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Presupuesto estimado: <span className="font-bold text-primary">{watchBudget}€</span>
                </label>
                <div className="px-4">
                  <Slider
                    defaultValue={[2000]}
                    min={500}
                    max={10000}
                    step={500}
                    onValueChange={(value) => setValue('budget', value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-foreground-muted">
                    <span>500€</span>
                    <span>5.000€</span>
                    <span>10.000€</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-4">¿Ya tienes estos recursos?</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasDesign"
                      onCheckedChange={(checked) => setValue('hasDesign', checked as boolean)} 
                    />
                    <label htmlFor="hasDesign" className="cursor-pointer">
                      Ya tengo diseño (Figma, XD, PSD...)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasContent"
                      onCheckedChange={(checked) => setValue('hasContent', checked as boolean)} 
                    />
                    <label htmlFor="hasContent" className="cursor-pointer">
                      Ya tengo contenido (textos, imágenes...)
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-4">¿Qué integraciones necesitas?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={integration.id}
                        onCheckedChange={(checked) => {
                          const current = watch('integrationsNeeded') || [];
                          if (checked) {
                            setValue('integrationsNeeded', [...current, integration.id]);
                          } else {
                            setValue('integrationsNeeded', current.filter(i => i !== integration.id));
                          }
                        }} 
                      />
                      <label htmlFor={integration.id} className="cursor-pointer">
                        {integration.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-4">Servicios adicionales</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="maintenance"
                        onCheckedChange={(checked) => setValue('maintenancePlan', checked)}
                      />
                      <label htmlFor="maintenance" className="cursor-pointer">
                        Plan de mantenimiento mensual
                      </label>
                    </div>
                    <Badge>Recomendado</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="seo"
                      onCheckedChange={(checked) => setValue('seoServices', checked)}
                    />
                    <label htmlFor="seo" className="cursor-pointer">
                      Servicios SEO
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="analytics"
                      onCheckedChange={(checked) => setValue('analyticsSetup', checked)}
                    />
                    <label htmlFor="analytics" className="cursor-pointer">
                      Configuración de Analytics
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Preferencia de hosting</label>
                <RadioGroup 
                  defaultValue="undecided"
                  onValueChange={(value) => setValue('hostingPreference', value as any)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cloud" id="cloud" />
                    <label htmlFor="cloud" className="cursor-pointer">Cloud gestionado por Websy</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="selfhosted" id="selfhosted" />
                    <label htmlFor="selfhosted" className="cursor-pointer">Tengo mi propio hosting/servidor</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="undecided" id="undecided" />
                    <label htmlFor="undecided" className="cursor-pointer">No estoy seguro todavía</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(3)}
              >
                Atrás
              </Button>
              
              <Button 
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
              >
                {loading ? 'Generando cotización...' : 'Generar cotización'} 
                {!loading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </>
        );
        
      case 5: // Results - Generated Quote
        return (
          <>
            {generatedQuote && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center bg-green-500/10 text-green-500 rounded-full p-3 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">¡Tu cotización está lista!</h3>
                  <p className="text-foreground-muted mt-2">
                    Hemos preparado una propuesta personalizada para tu proyecto
                  </p>
                </div>
                
                {quoteType === 'manual' ? (
                  // Manual quote result
                  <Card className="glass-card overflow-hidden">
                    <CardHeader className="bg-primary/10">
                      <CardTitle>Cotización Personalizada: {generatedQuote.projectType}</CardTitle>
                      <CardDescription>
                        Basada en los detalles proporcionados
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <span className="text-foreground-muted">Presupuesto estimado</span>
                          <span className="text-2xl font-bold">{generatedQuote.estimatedPrice}€</span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-4 border-b">
                          <span className="text-foreground-muted">Tiempo de desarrollo</span>
                          <span className="font-medium">{generatedQuote.timeline}</span>
                        </div>
                        
                        <div className="pb-4 border-b">
                          <h4 className="text-sm text-foreground-muted mb-2">Descripción del proyecto</h4>
                          <p>{generatedQuote.description}</p>
                        </div>
                        
                        {generatedQuote.extras && generatedQuote.extras.length > 0 && (
                          <div>
                            <h4 className="text-sm text-foreground-muted mb-2">Servicios adicionales</h4>
                            <ul className="space-y-1">
                              {generatedQuote.extras.map((extra: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  <span>{extra}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 bg-primary/5">
                      <p className="text-sm text-foreground-muted italic text-center w-full">
                        Esta cotización es estimada y puede variar según los detalles específicos del proyecto
                      </p>
                      <Button className="w-full">
                        Hablar con un experto <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  // Auto quote result - packages
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {generatedQuote.packages && generatedQuote.packages.map((pkg: any, i: number) => (
                        <Card 
                          key={i}
                          className={`overflow-hidden transition-all ${pkg.recommended ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}
                        >
                          <CardHeader className={pkg.recommended ? 'bg-primary text-white' : 'bg-primary/10'}>
                            <div className="flex justify-between items-center">
                              <CardTitle>{pkg.name}</CardTitle>
                              {pkg.recommended && (
                                <Badge variant="secondary" className="bg-white text-primary">
                                  Recomendado
                                </Badge>
                              )}
                            </div>
                            <CardDescription className={pkg.recommended ? 'text-white/90' : ''}>
                              {generatedQuote.projectType}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="pt-6">
                            <div className="mb-6 text-center">
                              <span className="text-3xl font-bold">{pkg.price}€</span>
                              <p className="text-sm text-foreground-muted">Estimado</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm text-foreground-muted mb-1">
                                Tiempo estimado: {generatedQuote.timeline}
                              </div>
                              
                              {pkg.features && pkg.features.map((feature: string, i: number) => (
                                <div key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              variant={pkg.recommended ? 'default' : 'outline'}
                            >
                              Seleccionar plan
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-foreground-muted italic mb-4">
                        Estos paquetes son estimados y pueden personalizarse según tus necesidades específicas
                      </p>
                      <Button>
                        Hablar con un experto para personalizar <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Comenzar nuevo presupuesto
                  </Button>
                </div>
              </div>
            )}
          </>
        );

      case 6: // Quick Quote
        return (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">Cotización Automática</h3>
              <p className="text-foreground-muted mt-2">
                Obtén una cotización instantánea basada en IA
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4">Tipo de Proyecto *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {projectTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        watchProjectType === type.id ? 
                        'border-primary bg-primary/10 ring-2 ring-primary/50' : 
                        'hover:border-primary/50 hover:bg-primary/5'
                      }`}
                      onClick={() => setValue('projectType', type.id as any, { shouldValidate: true })}
                    >
                      <div className="flex items-center gap-3">
                        {type.icon}
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-foreground-muted">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  ¿Qué incluye la cotización automática?
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                    <span className="text-sm">Estimación de precio basada en proyectos similares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                    <span className="text-sm">Opciones de paquetes con diferentes características</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                    <span className="text-sm">Tiempo estimado de desarrollo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary mt-1" />
                    <span className="text-sm font-medium">Sin compromiso y 100% gratuito</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <label className="block text-sm font-medium mb-2">Email (opcional)</label>
                <div className="flex space-x-4">
                  <Input 
                    placeholder="tu@empresa.com" 
                    className="flex-grow"
                    {...register("email")}
                  />
                  <Button 
                    onClick={generateAutomaticQuote}
                    disabled={loading}
                  >
                    {loading ? 'Generando...' : 'Generar Cotización'} 
                    {!loading && <Zap className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-foreground-muted mt-2">
                  Opcional: proporciona tu email para recibir la cotización por correo
                </p>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
              >
                Atrás
              </Button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <section id="cotizar" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: `linear-gradient(135deg, ${COLORS.accentBackground}50, ${COLORS.highlight}50)`, filter: 'blur(180px)' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: `linear-gradient(135deg, ${COLORS.darkBackground}50, ${COLORS.mediumBackground}50)`, filter: 'blur(150px)' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Cotizador</span> Avanzado
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Calcula el costo de tu próximo proyecto en minutos con nuestro cotizador inteligente.
            Personaliza cada aspecto y obtén un presupuesto detallado al instante.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl shadow-glow">
            {step > 1 && step < 5 && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div 
                      key={stepNumber}
                      className="flex flex-col items-center"
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                          step > stepNumber ? 
                          'bg-primary text-white' : 
                          step === stepNumber ? 
                          'bg-primary/20 text-primary border border-primary' :
                          'bg-muted text-foreground-muted'
                        }`}
                      >
                        {step > stepNumber ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
                      </div>
                      <div className="text-xs mt-1 hidden md:block">
                        {stepNumber === 1 && "Tipo de cotización"}
                        {stepNumber === 2 && "Información básica"}
                        {stepNumber === 3 && "Detalles del proyecto"}
                        {stepNumber === 4 && "Presupuesto"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="absolute top-0 left-0 h-1 bg-muted" style={{ width: '100%' }}></div>
                  <div 
                    className="absolute top-0 left-0 h-1 bg-primary" 
                    style={{ width: `${((step - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {renderStepContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

// Icon components for visual representation
const ClipboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="M12 11h4"></path>
      <path d="M12 16h4"></path>
      <path d="M8 11h.01"></path>
      <path d="M8 16h.01"></path>
    </svg>
  );
};

const RocketIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  );
};

export default AdvancedQuote;
