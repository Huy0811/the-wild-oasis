import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { signUp as signUpApi } from "../../services/apiAuth"

export function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account successfully created! Please verify the new account from the user's email address")
    }
  })

  return { isLoading, signUp }
}
