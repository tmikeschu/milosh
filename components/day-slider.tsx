import React from "react";
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  Input,
  SliderProps,
  SliderThumbProps,
  FormControlProps,
  Box,
  IconButton,
  Center,
  Divider,
} from "@chakra-ui/react";
import { Day, StoreUtils, useStore } from "../store";
import { useMountedState } from "react-use";
import {
  MinusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UpDownIcon,
} from "@chakra-ui/icons";

export type DaySliderProps = {
  day: Day;
  sliderProps?: SliderProps;
  sliderThumbProps?: SliderThumbProps;
  formControlProps?: FormControlProps;
};
export const DaySlider: React.FC<DaySliderProps> = ({
  day,
  sliderProps = {},
  sliderThumbProps = {},
  formControlProps = {},
}) => {
  const store = useStore();
  const getIsMounted = useMountedState();
  const values = getIsMounted() ? StoreUtils.getDay(store, day).values : [0];
  const max = (getIsMounted() ? StoreUtils.getMax(store) : 0) + 1;
  const isDouble = values.length > 1;
  const dayAbbrev = day.slice(0, 3);

  return (
    <VStack h="full" flex="1">
      <IconButton
        aria-label={`Split ${day} to doubles`}
        size="sm"
        onClick={() => store.splitDay(day)}
        colorScheme={isDouble ? "purple" : "gray"}
        variant="ghost"
        icon={
          <Center w="full" h="full">
            <VStack spacing="-1">
              <ChevronUpIcon
                boxSize="5"
                transition="transform 0.3s"
                {...(isDouble ? { transform: "rotate(180deg)" } : {})}
              />
              <Divider borderColor="purple.500" />
              <ChevronDownIcon
                boxSize="5"
                transition="transform 0.2s"
                {...(isDouble ? { transform: "rotate(180deg)" } : {})}
              />
            </VStack>
          </Center>
        }
      />

      <FormControl as={VStack} {...formControlProps} flex="1">
        <FormLabel color="gray.400" margin="0">
          {dayAbbrev}
        </FormLabel>

        {values.map((value, index) => (
          <VStack key={index} flex="1">
            <Input
              color="purple.500"
              fontWeight="bold"
              type="tel"
              variant="flushed"
              w="8"
              textAlign="center"
              value={value}
              onFocus={(e) => {
                e.target.setSelectionRange(0, e.target.value.length);
              }}
              onChange={(e) =>
                store.setDay({ day, value: Number(e.target.value) || 0, index })
              }
            />
            <Text fontSize="sm" color="gray.400">
              mi
            </Text>

            <Slider
              aria-label={`${day} miles`}
              colorScheme="purple"
              value={value}
              onChange={(value) => store.setDay({ day, value, index })}
              orientation="vertical"
              min={0}
              max={max}
              focusThumbOnChange={false}
              {...sliderProps}
              pointerEvents="auto"
              isDisabled={sliderProps.isDisabled || formControlProps.isDisabled}
              flex="1"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize="6" {...sliderThumbProps}>
                <Box color="purple.200" boxSize="3" as={UpDownIcon} />
              </SliderThumb>
            </Slider>
          </VStack>
        ))}
      </FormControl>
    </VStack>
  );
};
