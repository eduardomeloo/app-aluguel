'use client';

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
    CATEGORY    = 0,
    LOCATION    = 1,
    INFO        = 2,
    IMAGES      = 3,
    DESCRIPTION = 4,
    PRICE       = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    const onBack = () => {
        setStep((value) => value -1);
    }

    const onNext = () => {
        setStep((value) => value +1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create';

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Qual destas opções melhor descreve o seu lugar?"
                subtitle="Escolha uma categoria"
            />
            <div 
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50hv]
                    overflow-y-auto
                ">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={
                                (category) => setCustomValue('category', category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Qual a localização do imóvel?"
                    subtitle="Ajude os hóspedes a encontrá-lo!"
                />
                <CountrySelect 
                    value={location}
                    onChange={value => setCustomValue('location', value)}
                />
            </div>
        );
    }

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Anuncie seu espaço!"
            body={bodyContent}
        />
    );
}

export default RentModal;