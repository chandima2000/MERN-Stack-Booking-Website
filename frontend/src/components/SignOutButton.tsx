import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";


function SignOutButton() {

    const queryClient = useQueryClient();
    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.signOut, {

        onSuccess: async () => {

                    await queryClient.invalidateQueries("validateToken")    
                    // 1.Show the Toast Message
                    showToast({message:"SignOut Successful",type:"SUCCESS"});
                    
                },
                onError : (error : Error) => {
                        //Show the Toast Message
                        showToast({message:error.message,type:"ERROR"});
                }
   }); 

   const handleClick = () => {

        mutation.mutate();

   };

  return (

   <button
        onClick={handleClick} 
        className='text-blue-600 px-3 font-bold bg-white hover:bg-red-600 hover:text-white'>
            Sign Out
    </button>

  )

};

export default SignOutButton;