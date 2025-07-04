import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourseButton = ({courseId}) => {

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId); 
  };

  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url; // Redirect to Stripe checkout page
      } else{
        toast.error("Error while creating checkout session. Please try again later.");
      }
    }
    if(isError){
      toast.error(error?.data?.message || "An error occurred while processing your request. Please try again later.");
    }
  },[data, isSuccess, isError, error]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please wait...
        </>
      ) : (
        'Purchase Course'
      )}
    </Button>
  )
}

export default BuyCourseButton