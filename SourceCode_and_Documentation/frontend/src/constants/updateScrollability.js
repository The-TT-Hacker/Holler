const updateScrollability = (scroll) => {
  if (!scroll) 
    document.body.style.overflowY = "hidden"
  else
    document.body.style.overflowY = "scrollable"
}

export default updateScrollability