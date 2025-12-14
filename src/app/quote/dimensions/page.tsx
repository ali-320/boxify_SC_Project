"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const dimensionsSchema = z.object({
  length: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Length is required"),
  width: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Width is required"),
  height: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Height is required"),
  quantity: z.coerce.number({ invalid_type_error: "Must be a number" }).min(1, "Quantity must be at least 1"),
});

type DimensionsFormValues = z.infer<typeof dimensionsSchema>;

export default function DimensionsPage() {
  const router = useRouter();
  
  const form = useForm<DimensionsFormValues>({
    resolver: zodResolver(dimensionsSchema),
    defaultValues: () => {
      if (typeof window === "undefined") {
        return { length: 10, width: 10, height: 10, quantity: 100 };
      }
      const storedData = localStorage.getItem("quoteFormData");
      const data = storedData ? JSON.parse(storedData) : {};
      return {
        length: data.length || 10,
        width: data.width || 10,
        height: data.height || 10,
        quantity: data.quantity || 100,
      };
    },
  });

  useEffect(() => {
    form.reset(form.formState.defaultValues);
  }, [form]);

  const onSubmit = (data: DimensionsFormValues) => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("quoteFormData");
      const existingData = storedData ? JSON.parse(storedData) : {};
      localStorage.setItem("quoteFormData", JSON.stringify({ ...existingData, ...data }));
    }
    router.push("/quote/material");
  };

  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Request a Quote
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Fill out the form below and one of our specialists will get back
              to you shortly.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Dimensions & Quantity</CardTitle>
                <CardDescription>Step 1 of 3</CardDescription>
                <Progress value={(1 / 3) * 100} className="mt-4" />
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                  <CardContent>
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
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit">Next Step</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
