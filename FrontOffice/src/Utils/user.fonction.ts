import axios from "axios";

export const handleDeleteUser = async (
  onSuccess: (message: string) => void,
  onError: (message: string) => void,
  navigate: (path: string) => void
): Promise<void> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.delete(
      `${import.meta.env.VITE_DEV_API_URL}/api/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      onSuccess("Compte supprimé avec succès");
      localStorage.clear();
      navigate("/");
    }
  } catch (error) {
    onError("Une erreur c'est produite pendant la suppression de votre compte");
  }
};
