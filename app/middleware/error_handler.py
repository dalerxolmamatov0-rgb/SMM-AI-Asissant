from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Pydantic validatsiya xatolarini tushunarli o'zbekcha formatda qaytarish.
    """
    errors = []
    for err in exc.errors():
        field = " -> ".join(str(loc) for loc in err.get("loc", []))
        msg = err.get("msg", "Noto'g'ri qiymat")
        errors.append(f"{field}: {msg}")
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Iltimos, kiritilgan ma'lumotlarni to'g'ri to'ldiring.",
            "errors": errors
        }
    )

async def generic_exception_handler(request: Request, exc: Exception):
    """
    Kutilmagan server xatolarini ushlash va log qilish.
    """
    import traceback
    print(f"[ERROR] Exception on {request.method} {request.url.path}: {exc}")
    traceback.print_exc()
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": f"Server xatosi: {str(exc)}"
        }
    )
