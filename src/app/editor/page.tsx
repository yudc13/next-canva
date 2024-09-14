import { protectServer } from '@/features/auth/utils';
import Editor from "@/features/editor/components/Editor";

const EditorPage = async () => {
  await protectServer()

  return (
    <div className="h-full">
      <Editor />
    </div>
  );
};

export default EditorPage;
