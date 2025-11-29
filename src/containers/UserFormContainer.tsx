import UserForm from 'src/components/organisms/UserForm';
import type { UserFormInput } from 'src/libs/validations/user'
import { useAuthContext } from "src/contexts/AuthContext";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import addUser from "services/users/add-user";
import { ApiContext, User } from "src/types/data";
import { chooseImage, imageData2 } from "src/utils";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface UserFormContainerProps {
  onSave?: (error?: Error, user?: User) => void
}

const UserFormContainer = ({
  onSave,
}: UserFormContainerProps) => {
  const { authUser } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const image = chooseImage(imageData2)

  const handleSave = async (data: UserFormInput) => {
    if(!authUser) return

    let userImage = image;
    if(!data.image) {
       userImage = ''
    }

    const user = {
      profileImageUrl: userImage,
      displayName: data.name,
      dream: data.dream,
      limit: data.limit,
      image: data.image
    }

    const id = authUser.id
    console.log(id)

    try {
      setGlobalSpinner(true)
      const ret = await addUser(id, context, { user })
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSave && onSave(undefined, ret)
    } catch (err: unknown) {
      if(err instanceof Error) {
        window.alert(err.message)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSave && onSave(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <UserForm onSave={handleSave} />
}

export default UserFormContainer