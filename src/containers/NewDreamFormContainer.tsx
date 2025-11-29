import { useAuthContext } from "src/contexts/AuthContext";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { ApiContext, User } from "src/types/data";
import addUser from "services/users/add-user";
import NewDreamForm, { NewDreamFormData} from "src/components/organisms/NewDreamForm";
import { useState } from "react";

interface NewDreamFormContainerProps {
  onSave: (error?: Error, user?: User,) => void
}

const NewDreamFormContainer = ({
  onSave,
}: NewDreamFormContainerProps) => {
  const { authUser } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = async (data: NewDreamFormData) => {
    if(!authUser) return

    const user = {
      dream: data.dream,
      limit: data.limit,
    }
    const id = authUser.id
    
    try {
      setGlobalSpinner(true)
      setIsLoading(true);
      const ret = await addUser(id, context, { user }, )
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
      setIsLoading(false);
    }
  }

  return <NewDreamForm onSave={handleSave} isLoading={isLoading}/>

}

export default NewDreamFormContainer