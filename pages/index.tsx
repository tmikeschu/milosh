import {
  HStack,
  VStack,
  Text,
  Button,
  ButtonGroup,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useLocalStorage } from "react-use";
import { useStore, Day, DAYS, StoreUtils } from "../store";
import { DaySlider } from "../components/day-slider";
import type { NextPage } from "next";
import { SavedConfigs } from "../components/saved-configs";
import { DaySliderModal } from "../components/day-slider-modal";

const SAVED_PLANS_KEY = "saved-plans";

const App: NextPage = () => {
  const store = useStore();
  const [savedPlans = [], setSavedPlans] = useLocalStorage<
    Record<Day, number>[]
  >(SAVED_PLANS_KEY, []);
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
          <DaySlider
            key={day}
            day={day}
            formControlProps={{ isDisabled: true }}
          />
        ))}
      </HStack>

      <DaySliderModal />

      <ButtonGroup size="sm" py="4">
        <Button onClick={store.reset}>Clear</Button>
        <Button
          colorScheme="purple"
          onClick={() => {
            const config = StoreUtils.getPlan(store);
            setSavedPlans(
              [...savedPlans, config]
                .sort((a, b) => StoreUtils.getTotal(b) - StoreUtils.getTotal(a))
                .filter(
                  (config, i, orig) =>
                    orig.findIndex((c) => {
                      return JSON.stringify(c) === JSON.stringify(config);
                    }) === i
                )
            );
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
