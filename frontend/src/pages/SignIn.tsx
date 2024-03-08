import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export type SignInFormData = {
    email : string;
    password: string;
}

function SignIn() {

    const navigate = useNavigate();
    const {showToast} = useAppContext();
    const {register, formState:{errors},handleSubmit} = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn,{
        onSuccess: async () => {
            // 1.Show the Toast Message
            showToast({message:"Login Successful",type:"SUCCESS"});
            // 2. Redirected to the home page
            navigate('/');
        },
        onError : (error : Error) => {
                //Show the Toast Message
                showToast({message:error.message,type:"ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

  return (

    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
        <h2 className='text-3xl font-bold '>Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", {required: "Email is required"})}
                 >
                </input>
                {errors.email && (<span className="text-red-500"
                    >{errors.email.message}</span>)
                }
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1" >
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {required: "Password is required", 
                             minLength:{value:6,message:"The password must be at least 6 characters"}})}
                 >
                </input>
                {errors.password && (<span className="text-red-500"
                    >{errors.password.message}</span>)
                }
        </label>

        <span>
            <button
                type="submit" 
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 text-xl"
                    >Login
            </button>
        </span>


    </form>
    
  )
}

export default SignIn;