
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitQuote } from "@/lib/actions";

const quoteSchema = z.object({
  length: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Length is required"),
  width: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Width is required"),
  height: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Height is required"),
  quantity: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Quantity must be at least 1"),
  material: z.enum(["cardboard", "corrugated", "paperboard"], { required_error: "Please select a material." }),
  printing: z.enum(["none", "1-color", "full-color"], { required_error: "Please select a printing option." }),
  artwork: z.any().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  streetAddress: z.string().min(2, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(2, "ZIP Code is required"),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const steps = [
  { id: 0, title: "Dimensions & Quantity", fields: ["length", "width", "height", "quantity"] },
  { id: 1, title: "Material & Printing", fields: ["material", "printing"] },
  { id: 2, title: "Contact & Address", fields: ["artwork", "name", "email", "phone", "companyName", "streetAddress", "city", "state", "zipCode"] },
];

export function QuoteForm({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hasDimensions = !!(searchParams?.length && searchParams?.width && searchParams?.height);
  const initialStep = hasDimensions ? 1 : 0;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      length: searchParams?.length ? Number(searchParams.length) : 10,
      width: searchParams?.width ? Number(searchParams.width) : 10,
      height: searchParams?.height ? Number(searchParams.height) : 10,
      quantity: searchParams?.quantity ? Number(searchParams.quantity) : 100,
      material: "cardboard",
      printing: "none",
      name: "",
      email: "",
      phone: "",
      companyName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: QuoteFormValues) => {
    startTransition(async () => {
      const { artwork, ...formData } = data;
      const result = await submitQuote(formData);

      if (result.success) {
        toast({ title: "Success!", description: result.message });
        form.reset();
        setCurrentStep(initialStep);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "An unexpected error occurred.",
        });
      }
    });
  };

  const next = async () => {
    const fields = steps[currentStep].fields as (keyof QuoteFormValues)[];
    const output = await form.trigger(fields, { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > initialStep) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{steps[currentStep].title}</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length}
        </CardDescription>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <CardContent>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <FormField control={form.control} name="length" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (in)</FormLabel>
                      <FormControl><Input type="number" min="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="width" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (in)</FormLabel>
                      <FormControl><Input type="number" min="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="height" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (in)</FormLabel>
                      <FormControl><Input type="number" min="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="quantity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl><Input type="number" min="1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid gap-8">
                <FormField control={form.control} name="material" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="cardboard" /></FormControl><FormLabel className="font-normal">Cardboard</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="corrugated" /></FormControl><FormLabel className="font-normal">Corrugated</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="paperboard" /></FormControl><FormLabel className="font-normal">Paperboard</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="printing" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Printing Options</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="none" /></FormControl><FormLabel className="font-normal">None</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="1-color" /></FormControl><FormLabel className="font-normal">1-Color Print</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="full-color" /></FormControl><FormLabel className="font-normal">Full-Color Print</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid gap-6">
                <FormField control={form.control} name="artwork" render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Artwork (optional)</FormLabel>
                    <FormControl><Input type="file" onChange={(e) => onChange(e.target.files)} {...rest} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem><FormLabel>Company Name (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="streetAddress" render={({ field }) => (
                  <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="zipCode" render={({ field }) => (
                    <FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={prev} disabled={currentStep === initialStep}>Back</Button>
            {currentStep === steps.length - 1 ? (
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Quote
              </Button>
            ) : (
              <Button type="button" onClick={next}>Next Step</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
