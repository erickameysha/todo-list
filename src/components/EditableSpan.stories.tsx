
import EditableSpan from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan component',
    component: EditableSpan,
}
const EditableSpanChanged = action('title changet')
export const EditableSpanBaseExample = () => {
  return <EditableSpan title={'Start  Value'} callBack={EditableSpanChanged}/>
}