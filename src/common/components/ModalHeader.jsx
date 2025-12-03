import React from 'react'

function ModalHeader() {

       useEffect(() => {
        if (modal) {
            
            gsap.fromTo(
                modalSlide.current,
                { x: "-100%" },     // start fully left
                {
                    x: "0%",
                    duration: 0.6,
                    ease: "power3.out"
                }
            );
        }
    }, [modal]);
  return (
    <div className='min-h-screen w-full absolute bg-gray-200/40 z-110'>
        ModalHeader
    </div>
  )
}

export default ModalHeader