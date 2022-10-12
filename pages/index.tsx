import {
  HStack,
  VStack,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ButtonGroup,
  Heading,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  toVarReference,
} from "@chakra-ui/react";
import { useLocalStorage } from "react-use";
import produce from "immer";
import { useStore, Day, DAYS, StoreUtils } from "../store";
import { SavedConfig } from "../components/saved-config";
import { DaySlider } from "../components/day-slider";
import type { NextPage } from "next";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

const SAVED_PLANS_KEY = "saved-plans";

const App: NextPage = () => {
  const store = useStore();
  const [savedPlans = [], setSavedPlans] = useLocalStorage<
    Record<Day, number>[]
  >(SAVED_PLANS_KEY, []);

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

      {store.selectedDay && (
        <Modal isOpen onClose={() => store.setSelectedDay(null)} size="full">
          <ModalOverlay />
          <ModalContent h="full">
            <ModalHeader>{store.selectedDay}</ModalHeader>
            <ModalCloseButton />
            <ModalBody h="full">
              <DaySlider
                day={store.selectedDay}
                formControlProps={{ h: "full" }}
                sliderThumbProps={{
                  boxSize: 10,
                  children: <ArrowUpDownIcon w="6" h="6" color="purple.300" />,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={() => store.setSelectedDay(null)}
              >
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <ButtonGroup size="sm" py="4">
        <Button onClick={store.reset}>Clear</Button>
        <Button
          colorScheme="purple"
          onClick={() => {
            const config = StoreUtils.getPlan(store);
            setSavedPlans(
              [...savedPlans, config].sort(
                (a, b) => StoreUtils.getTotal(b) - StoreUtils.getTotal(a)
              )
            );
          }}
        >
          Save
        </Button>
      </ButtonGroup>

      <Accordion allowToggle w="full" maxW="xl">
        <AccordionItem>
          <AccordionButton justifyContent="center">
            Saved plans
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel px="0" py="2">
            <VStack>
              {savedPlans.map((config, i) => (
                <SavedConfig
                  key={i}
                  config={config}
                  index={i}
                  onDelete={() => {
                    const updated = produce(savedPlans, (draft) => {
                      draft.splice(i, 1);
                    });
                    setSavedPlans(updated);
                  }}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default App;
