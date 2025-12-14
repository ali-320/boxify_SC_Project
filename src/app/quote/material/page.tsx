"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const materialSchema = z.object({
  material: z.enum(["cardboard", "corrugated", "paperboard"], { required_error: "Please select a material." }),
  printing: z.enum(["none", "1-color", "full-color"], { required_error: "Please select a printing option." }),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

export default function MaterialPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: () => {
      if (typeof window === "undefined") {
        return { material: "cardboard", printing: "none" };
      }
      const storedData = localStorage.getItem("quoteFormData");
      const data = storedData ? JSON.parse(storedData) : {};
      return {
        material: data.material || "cardboard",
        printing: data.printing || "none",
      };
    },
  });
  
  useEffect(() => {
    form.reset(form.formState.defaultValues);
  }, [form]);


  // Handle pre-filled dimensions from product page
  useEffect(() => {
    const length = searchParams.get("length");
    const width = searchParams.get("width");
    const height = searchParams.get("height");

    if (length && width && height) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("quoteFormData");
        const existingData = storedData ? JSON.parse(storedData) : {};
        const newData = {
          ...existingData,
          length: Number(length),
          width: Number(width),
          height: Number(height),
          quantity: existingData.quantity || 100, // keep existing or default quantity
        };
        localStorage.setItem("quoteFormData", JSON.stringify(newData));
      }
    }
  }, [searchParams]);

  const onSubmit = (data: MaterialFormValues) => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("quoteFormData");
      const existingData = storedData ? JSON.parse(storedData) : {};
      localStorage.setItem("quoteFormData", JSON.stringify({ ...existingData, ...data }));
    }
    router.push("/quote/contact");
  };

  const prev = () => {
    router.push("/quote/dimensions");
  };

  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Material & Printing</CardTitle>
                <CardDescription>Step 2 of 3</CardDescription>
                <Progress value={(2 / 3) * 100} className="mt-4" />
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                  <CardContent>
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
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prev}>Back</Button>
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
