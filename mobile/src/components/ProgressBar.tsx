import { View } from "react-native";

interface Props {
  progress?: number;
}
export function ProgressBar({ progress = 0 }: Props) {
  return (
    <View className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  )
}