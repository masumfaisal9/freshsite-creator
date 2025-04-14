
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Star, UserRound } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  initialReviews: Review[];
}

const ProductReviews = ({ productId, initialReviews }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showDialog, setShowDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const { isAuthenticated, user } = useAuth();
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be a server API call
    const newReview: Review = {
      id: `review-${Date.now()}`,
      user: user?.name || 'Anonymous',
      rating,
      title,
      comment,
      date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
    
    setReviews([newReview, ...reviews]);
    setRating(5);
    setTitle('');
    setComment('');
    setShowDialog(false);
  };
  
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Customer Reviews ({reviews.length})</h3>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full">Write a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmitReview} className="space-y-4 pt-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Review Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Your Review</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full"
                    placeholder="Share your experience with this product"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-fresh-600 hover:bg-fresh-700">
                    Submit Review
                  </Button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center">
                <p className="text-gray-600 mb-4">Please sign in to write a review</p>
                <Button asChild>
                  <a href="/login">Login</a>
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
              <div className="sm:w-1/4">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <UserRound className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="font-medium text-gray-800">{review.user}</p>
                </div>
                <div className="flex mt-2 mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-500 text-sm">Posted on {review.date}</p>
              </div>
              <div className="sm:w-3/4">
                <p className="font-medium text-gray-800 mb-2">{review.title}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">No reviews yet</p>
          <p className="text-gray-500 text-sm mb-4">Be the first to review this product</p>
          <Button 
            onClick={() => setShowDialog(true)}
            className="bg-fresh-600 hover:bg-fresh-700"
          >
            Write a Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
