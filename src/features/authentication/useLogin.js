import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { login as loginApi } from "../../services/apiAuth"

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user)
      navigate("/dashboard", { replace: true })
    },
    onError: (error) => {
      console.error(error)
      toast.error("Provided email or password are incorrect")
    }
  })

  return { isLoading, login }
}
