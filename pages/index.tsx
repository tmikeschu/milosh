import {
  HStack,
  VStack,
  Text,
  Button,
  ButtonGroup,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useStore, Day, DAYS, StoreUtils } from "../store";
import { DaySlider } from "../components/day-slider";
import type { NextPage } from "next";
import { SavedConfigs } from "../components/saved-configs";
import { DaySliderModal } from "../components/day-slider-modal";
import { useLegacySavedConfigs } from "../hooks/use-legacy-saved-configs";

const App: NextPage = () => {
  useLegacySavedConfigs();

  const store = useStore();
  const toast = useToast();

  return (
    <VStack p={["2", "4"]}>
      <Heading
        as="h1"
        fontSize="lg"
        textTransform="uppercase"
        fontWeight="bold"
        color="purple.500"
      >
        Weekly mileage planner
      </Heading>

      <Text as="b" fontWeight="bold" fontSize="3xl" color="gray.700">
        {StoreUtils.getTotal(store)}mi
      </Text>

      <HStack p={["2", "4"]} w="full" maxW="xl">
        {DAYS.map((day) => (
          <DaySlider key={day} day={day} />
        ))}
      </HStack>

      <DaySliderModal />

      <ButtonGroup size="sm" py="4">
        <Button onClick={store.reset}>Clear</Button>
        <Button
          colorScheme="purple"
          onClick={() => {
            const plan = StoreUtils.getPlan(store);
            store.addPlan(plan);
            toast({ status: "success", title: "Plan saved" });
          }}
        >
          Save
        </Button>
      </ButtonGroup>

      <SavedConfigs />
    </VStack>
  );
};

export default App;
