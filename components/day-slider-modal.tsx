import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { DaySlider } from "../components/day-slider";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export const DaySliderModal: React.FC = () => {
  const store = useStore();
  return (
    store.selectedDay && (
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
    )
  );
};
