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
import { SavedPlans } from "../components/saved-plans/saved-plans";
import { useLegacySavedPlans } from "../hooks/use-legacy-saved-plans";
import { usePromptNewVersion } from "../hooks/use-prompt-new-version";
import { useMountedState } from "react-use";

const App: NextPage = () => {
  useLegacySavedPlans();
  usePromptNewVersion();

  const store = useStore();
  const toast = useToast();
  const getIsMounted = useMountedState();
  const total = getIsMounted()
    ? StoreUtils.getTotal(StoreUtils.toPlan(store))
    : 0;

  return (
    <VStack px={["2", "4"]} py={["8", "10"]} h="100vh">
      <Heading
        as="h1"
        fontSize="lg"
        textTransform="uppercase"
        fontWeight="bold"
        color="purple.500"
      >
        How much should I run today?
      </Heading>

      <Text as="b" fontWeight="bold" fontSize="3xl" color="gray.700">
        {total}mi
      </Text>

      <HStack p={["2", "4"]} w="full" maxW="xl" flex="1" alignItems="stretch">
        {DAYS.map((day) => (
          <DaySlider key={day} day={day} />
        ))}
      </HStack>

      <ButtonGroup size="sm" py="4">
        <Button onClick={store.reset}>Clear</Button>
        <Button
          colorScheme="purple"
          onClick={() => {
            const plan = StoreUtils.getPlan(store);
            store.addPlan(plan);
            toast({ status: "success", title: "Plan saved", isClosable: true });
          }}
        >
          Save
        </Button>
      </ButtonGroup>

      <SavedPlans />
    </VStack>
  );
};

export default App;
