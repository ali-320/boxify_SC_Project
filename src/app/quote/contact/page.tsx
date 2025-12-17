"use client";

import { useState, useTransition, useEffect, ChangeEvent, DragEvent, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UploadCloud, X, File as FileIcon } from "lucide-react";
import { collection } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { validateQuote } from "@/lib/actions";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useUploadFile } from "@/hooks/use-upload-file";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  streetAddress: z.string().min(2, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(2, "ZIP Code is required"),
  artworkFileUrl: z.string().url().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];

export default function ContactQuotePage() {
  const router = useRouter();
  const firestore = useFirestore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { uploadFile, uploadProgress, downloadURL, isUploading, error: uploadError, cancelUpload } = useUploadFile();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("quoteFormData");
      const data = storedData ? JSON.parse(storedData) : {};
      form.reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        companyName: data.companyName || "",
        streetAddress: data.streetAddress || "",
        city: data.city || "",
        state: data.state || "",
        zipCode: data.zipCode || "",
        artworkFileUrl: data.artworkFileUrl || undefined,
      });
      if (data.artworkFileUrl) {
        setFileName("Uploaded Artwork");
      }
    }
  }, [form]);

  useEffect(() => {
    if (downloadURL) {
      form.setValue("artworkFileUrl", downloadURL);
      const storedData = JSON.parse(localStorage.getItem("quoteFormData") || "{}");
      storedData.artworkFileUrl = downloadURL;
      localStorage.setItem("quoteFormData", JSON.stringify(storedData));
    }
  }, [downloadURL, form]);

  useEffect(() => {
    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: uploadError.message,
      });
      setFileName(null);
    }
  }, [uploadError, toast]);

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload a JPG, PNG, GIF, or SVG." });
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({ variant: "destructive", title: "File Too Large", description: `File must be smaller than ${MAX_FILE_SIZE_MB}MB.` });
      return;
    }
    setFileName(file.name);
    uploadFile(file, "artwork-submissions");
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeArtwork = () => {
    cancelUpload();
    setFileName(null);
    form.setValue("artworkFileUrl", undefined);
    const storedData = JSON.parse(localStorage.getItem("quoteFormData") || "{}");
    delete storedData.artworkFileUrl;
    localStorage.setItem("quoteFormData", JSON.stringify(storedData));
  };

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      const storedData = localStorage.getItem("quoteFormData");
      const allData = { ...(storedData ? JSON.parse(storedData) : {}), ...data };
      
      const result = await validateQuote(allData);

      if (!result.success) {
        toast({ variant: "destructive", title: "Validation Error", description: result.message || "Please check the form for errors." });
        return;
      }

      try {
        if (!firestore) {
          throw new Error("Firestore is not initialized.");
        }
        const quoteCollection = collection(firestore, "quoteRequests");
        const { length, width, height, ...rest } = result.data;
        const quoteData = {
          ...rest,
          contactName: rest.name,
          printingOptions: rest.printing,
          productDimensions: `${length}x${width}x${height}`,
          submissionDate: new Date().toISOString(),
        };

        addDocumentNonBlocking(quoteCollection, quoteData);

        toast({ title: "Success!", description: "Your quote has been submitted." });
        localStorage.removeItem("quoteFormData");
        router.push("/");

      } catch (error) {
        console.error("Client-side Firestore error:", error);
        toast({ variant: "destructive", title: "Submission Error", description: "Could not submit quote. Please try again." });
      }
    });
  };

  const prev = () => router.push("/quote/material");

  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Contact & Address</CardTitle>
                <CardDescription>Step 3 of 3</CardDescription>
                <Progress value={100} className="mt-4" />
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormItem>
                        <FormLabel>Artwork (optional)</FormLabel>
                        {!fileName ? (
                          <div
                            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                              "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors duration-200",
                              isDragging ? "border-primary bg-primary/10" : "border-input hover:bg-accent"
                            )}
                          >
                            <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
                            <p className="font-semibold">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max {MAX_FILE_SIZE_MB}MB)</p>
                            <Input ref={fileInputRef} type="file" onChange={handleFileChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" accept={ALLOWED_TYPES.join(',')} />
                          </div>
                        ) : (
                          <div className="rounded-lg border border-border p-4">
                            {isUploading && (
                              <div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">{fileName}</p>
                                  <Button variant="ghost" size="icon" onClick={cancelUpload}><X className="h-4 w-4" /></Button>
                                </div>
                                <Progress value={uploadProgress} className="mt-2" />
                              </div>
                            )}
                            {downloadURL && (
                              <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                  {downloadURL.includes('.svg') ? <FileIcon className="h-full w-full text-muted-foreground" /> : <Image src={downloadURL} alt="Artwork preview" fill className="object-cover" />}
                                </div>
                                <div className="flex-grow">
                                  <p className="font-medium">{fileName}</p>
                                  <a href={downloadURL} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View Uploaded File</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={removeArtwork}><X className="h-4 w-4 text-destructive" /></Button>
                              </div>
                            )}
                          </div>
                        )}
                      </FormItem>
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="streetAddress" render={({ field }) => (<FormItem><FormLabel>Street Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State / Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="zipCode" render={({ field }) => (<FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prev}>Back</Button>
                    <Button type="submit" disabled={isPending || isUploading}>
                      {(isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit Quote
                    </Button>
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
