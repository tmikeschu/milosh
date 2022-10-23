import {
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocalStorage, useMountedState } from "react-use";
import produce from "immer";
import { Day } from "../store";
import { SavedConfig } from "./saved-config";
import { DeleteSavedConfigAlert } from "./delete-saved-config-alert";
import * as React from "react";

const SAVED_PLANS_KEY = "saved-plans";

export const SavedConfigs: React.FC = () => {
  // Because we're using `useLocalStorage`,
  // we need to check if the component is mounted
  // so the SSR matches the initial browser render
  const isMounted = useMountedState();

  const [savedPlans = [], setSavedPlans] = useLocalStorage<
    Record<Day, number>[]
  >(SAVED_PLANS_KEY, []);
  const toast = useToast();

  const [indexToDelete, setIndexToDelete] = React.useState<number | null>(null);
  const deleteSavedConfig = () => {
    if (indexToDelete === null) return;

    const updated = produce(savedPlans, (draft) => {
      draft.splice(indexToDelete, 1);
    });
    setSavedPlans(updated);
    toast({ status: "success", title: "Plan deleted" });
  };

  const disclosure = useDisclosure({
    onClose: () => {
      setIndexToDelete(null);
    },
  });

  if (!isMounted()) return null;

  return (
    <>
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
                    setIndexToDelete(i);
                    disclosure.onOpen();
                  }}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <DeleteSavedConfigAlert
        {...disclosure}
        onConfirm={() => {
          deleteSavedConfig();
          disclosure.onClose();
        }}
      />
    </>
  );
};
