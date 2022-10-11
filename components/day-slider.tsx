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
} from "@chakra-ui/react";
import { Day, StoreUtils, useStore } from "../store";

export const DaySlider: React.FC<{ day: Day }> = ({ day }) => {
  const store = useStore();

  return (
    <FormControl as={VStack} key={day} h="60" flex="1">
      <FormLabel color="gray.400" margin="0">
        {day.substr(0, 3)}
      </FormLabel>

      <Input
        color="purple.500"
        fontWeight="bold"
        type="tel"
        variant="flushed"
        w="8"
        textAlign="center"
        value={store[day]}
        onChange={(e) =>
          store.setDay({ day, value: Number(e.target.value) || 0 })
        }
      />
      <Text fontSize="sm" color="gray.400">
        mi
      </Text>

      <Slider
        colorScheme="purple"
        value={store[day]}
        onChange={(value) => store.setDay({ day, value })}
        orientation="vertical"
        min={0}
        max={StoreUtils.getMax(store) + 1}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
};
