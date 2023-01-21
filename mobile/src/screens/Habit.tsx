import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parseDate = dayjs(date);
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="mt-2 text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={40} />

        <View className="mt-6">
          <CheckBox
            title="2L de água"
          />
          <CheckBox
            title="Exercício"
            checked
          />
          <CheckBox
            title="Alimentação saudável"
            checked
          />
          <CheckBox
            title="Planejar próximo dia"
          />
          <CheckBox
            title="Dormir 8h"
          />
        </View>
      </ScrollView>
    </View>
  )
}