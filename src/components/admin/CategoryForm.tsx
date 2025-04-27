
import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CategoryFormValues {
  name: string;
  description: string;
}

interface CategoryFormProps {
  category?: any;
  onClose: () => void;
}

const CategoryForm = ({ category, onClose }: CategoryFormProps) => {
  const { register, handleSubmit } = useForm<CategoryFormValues>({
    defaultValues: category || {},
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (category?.id) {
        const { error } = await supabase
          .from("categories")
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq("id", category.id);

        if (error) throw error;
        toast.success("Category updated successfully");
      } else {
        const { error } = await supabase
          .from("categories")
          .insert([data]);

        if (error) throw error;
        toast.success("Category created successfully");
      }
      
      onClose();
    } catch (error) {
      toast.error("Failed to save category");
      console.error(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {category ? "Edit Category" : "Add New Category"}
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

export default CategoryForm;
