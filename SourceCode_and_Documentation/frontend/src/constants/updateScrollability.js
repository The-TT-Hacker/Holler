const updateScrollability = (scroll) => {
  if (!scroll) 
    document.body.style.overflow = "hidden"
  else
    document.body.style.overflow = "scrollable"
}

export default updateScrollability