
import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url?: string;
  inventory_count: number;
  is_featured: boolean;
  is_new: boolean;
  is_sale: boolean;
}

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { register, handleSubmit, setValue } = useForm<ProductFormValues>({
    defaultValues: product || {
      is_featured: false,
      is_new: false,
      is_sale: false,
      inventory_count: 0,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, "-");
      
      if (product?.id) {
        const { error } = await supabase
          .from("products")
          .update({ ...data, slug, updated_at: new Date().toISOString() })
          .eq("id", product.id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([{ ...data, slug }]);

        if (error) throw error;
        toast.success("Product created successfully");
      }
      
      onClose();
    } catch (error) {
      toast.error("Failed to save product");
      console.error(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>
          {product ? "Edit Product" : "Add New Product"}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <select
              {...register("category", { required: true })}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {categories?.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inventory" className="text-right">Stock</Label>
            <Input
              id="inventory"
              type="number"
              {...register("inventory_count", { required: true })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input
              id="image"
              {...register("image_url")}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-end space-x-2">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                onCheckedChange={(checked) => setValue("is_featured", checked)}
                checked={product?.is_featured}
              />
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Label htmlFor="new">New</Label>
              <Switch
                id="new"
                onCheckedChange={(checked) => setValue("is_new", checked)}
                checked={product?.is_new}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ProductForm;
